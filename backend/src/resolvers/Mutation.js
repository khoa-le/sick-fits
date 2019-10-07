const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {randomBytes} = require('crypto');
const {promisify} = require('util');
const {transport, makeANiceEmail} = require("../mail");
const {hasPermission} = require('../utils');
const stripe = require("../stripe");
const mutations = {
    async createItem(parent, args, ctx, info) {
        if (!ctx.request.userId) {
            throw new Error('You must be logged in to do that!')
        }

        const item = await ctx.db.mutation.createItem({
            data: {
                //This is how we create relationship between user and item
                user: {
                    connect: {
                        id: ctx.request.userId,
                    }
                },
                ...args
            }
        }, info);

        return item;
    },
    updateItem(parent, args, ctx, info) {
        //first take a copy of updates
        const updates = {...args}
        //remove ID
        delete updates.id;
        //run the update method
        return ctx.db.mutation.updateItem({
            data: updates,
            where: {
                id: args.id,
            }
        }, info);
    },
    async deleteItem(parent, args, ctx, info) {

        const where = {id: args.id};
        //find item
        const item = await ctx.db.query.item({where}, `{id title user {id} }`)
        //Check if they own that item or have permissions
        /**
         * TODO
         */
        const ownItem = item.user.id = ctx.request.userId;
        const hasPermissions = ctx.request.user.permissions.some(permissions =>
            ['ADMIN', 'ITEMDELETE'].includes(permissions));

        if (!ownItem && !hasPermissions) {
            throw new Error("You don't have permision to do that!");
        }

        //Delete It
        return ctx.db.mutation.deleteItem({where}, info)
    },
    async signup(parent, args, ctx, info) {
        args.email = args.email.toLowerCase();
        const password = await bcrypt.hash(args.password, 10)
        const user = await ctx.db.mutation.createUser(
            {
                data: {
                    ...args,
                    password,
                    permissions: {set: ['USER']}
                },

            }, info
        );
        //create the jwt token for them
        const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);

        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
        })
        return user;
    },
    async signin(parent, {email, password}, ctx, info) {
        const user = await ctx.db.query.user({where: {email}});
        if (!user) {
            throw new Error(`No such user found for email ${email}`);
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error('Invalid password!');
        }

        const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
        });
        return user;
    },
    signout(parent, args, ctx, info) {
        ctx.response.clearCookie('token');
        return {message: 'Goodbye!'}
    },
    async requestReset(parent, args, ctx, info) {
        const user = await ctx.db.query.user({where: {email: args.email}})
        if (!user) {
            throw new Error(`No such user found for email ${args.email}`);
        }
        const resetToken = (await promisify(randomBytes)(20)).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000;

        const res = await ctx.db.mutation.updateUser({
            where: {email: args.email},
            data: {resetToken, resetTokenExpiry}
        });

        //send email
        const mailRes = await transport.sendMail({
            from: 'khoaln6@gmail.com',
            to: user.email,
            subject: "Reset Token",
            html: makeANiceEmail(`Your Password Reset Token is here!\n\n <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click Here to Reset</a>`)
        })

        return {message: "requested"};
    },
    async resetPassword(parent, args, ctx, info) {
        if (args.password !== args.confirmPassword) {
            throw new Error("Your password do not match");
        }

        const [user] = await ctx.db.query.users({
            where: {
                resetToken: args.resetToken,
                resetTokenExpiry_gte: Date.now - 3600000,
            }
        });
        if (!user) {
            throw new Error("This token is either invalid or expired!")
        }
        const password = await bcrypt.hash(args.password, 10);

        const updateUser = await ctx.db.mutation.updateUser({
            where: {email: user.email},
            data: {
                password,
                resetToken: null,
                resetTokenExpiry: null,
            }
        });

        const token = jwt.sign({userId: updateUser.id}, process.env.APP_SECRET)
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 34 * 365,
        })

        return updateUser;
    },
    async updatePermissions(parent, args, ctx, info) {
        if (!ctx.request.userId) {
            throw new Error('You must be logged in');
        }
        const currentUser = await ctx.db.query.user({
            where: {
                id: ctx.request.userId,
            }
        }, info);

        hasPermission(currentUser, ['ADMIN', 'PERMISSIONUPDATE']);

        return ctx.db.mutation.updateUser(
            {
                where: {
                    id: args.userId
                },
                data: {
                    permissions: {
                        set: args.permissions,
                    },
                },
            },
            info
        );
    },
    async addToCart(paren, args, ctx, info) {
        const {userId} = ctx.request;
        if (!userId) {
            throw new Error("You are not logged in");
        }
        const [existingCartItem] = await ctx.db.query.cartItems({
            where: {
                user: {id: userId},
                item: {id: args.id},
            }
        });

        if (existingCartItem) {
            console.log("This item is already in their cart");
            return ctx.db.mutation.updateCartItem({
                where: {id: existingCartItem.id},
                data: {quantity: existingCartItem.quantity + args.quantity},
            }, info);
        }
        return ctx.db.mutation.createCartItem({
            data: {
                user: {
                    connect: {id: userId},
                },
                item: {
                    connect: {id: args.id}
                },
                quantity: args.quantity,
            }
        }, info);

    },
    async removeFromCart(parent, args, ctx, info) {
        //Find the cart item
        const cartItem = await ctx.db.query.cartItem({
                where: {
                    id: args.id,
                },
            },
            `{id, user{id}}`
        );
        if (!cartItem) throw new Error("No Cart Item Found!");
        //Make sure they own that cart item
        if (cartItem.user.id !== ctx.request.userId) {
            throw new Error("Cheatin huhhhh");
        }
        //delete that cart item
        return ctx.db.mutation.deleteCartItem({
            where: {id: args.id},
        }, info);
    },
    async createOrder(parent, args, ctx, info) {
        const {userId} = ctx.request;
        if (!userId) {
            throw new Error("You mus be signed in to complete this order")
        }
        const currentUser = await ctx.db.query.user(
            {where: {id: userId}},
            `{
                id
                name
                email
                cart{
                    id
                    quantity
                    item { title price id description image largeImage }
                }
            }`
        );

        const amount = currentUser.cart.reduce((tally, cartItem) =>
            tally + cartItem.item.price * cartItem.quantity, 0
        );

        const charge = await stripe.charges.create({
            amount: amount,
            currency: 'USD',
            source: args.token,
        });

        const orderItems = currentUser.cart.map(cartItem => {
            const orderItem = {
                ...cartItem.item,
                quantity: cartItem.quantity,
                user: {connect: {id: userId}},
            };
            delete orderItem.id;
            return orderItem;
        });

        const order = await ctx.db.mutation.createOrder({
            data: {
                total: charge.amount,
                charge: charge.id,
                items: {create: orderItems},
                user: {connect: {id: userId}},
            },
        })

        const cartItemIds = currentUser.cart.map(cartItem => cartItem.id);
        await ctx.db.mutation.deleteManyCartItems({
            where: {
                id_in: cartItemIds,
            }
        });
        return order;
    }


};

module.exports = mutations;
