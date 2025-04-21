import bcrypt from "bcryptjs";
import { db }  from "../libs/db.js";
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {

        const existingUser = await db.user.findUnique({
            where:{
                email
            }
        })

        if (existingUser) {
            return res.status(400).json({ 
                status: false,
                msg: "User already exists" 
            });
        }

        const hashedPassword = await bcrypt.hash(String(password), 10);

        const newUser = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: UserRole.USER
            }
        })

        const token = jwt.sign({
            id: newUser.id
        }, process.env.JWT_SECRET, {
            expiresIn: "7d" // 7 days
        });

        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60 * 24 * 7 * 1000 // 7 days
        })

        res.status(201).json({
            status: true,
            msg: "User created successfully",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                image: newUser.image
            }
        })
        
    } catch (error) {
        console.error("Error in creating user", error);
        res.status(500).json({
            status: false,
            msg: "Error in creating user"
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await db.user.findUnique({
            where: {
                email
            }
        })

        if(!user) {
            return res.status(400).json({
                status: false,
                msg: "User not found"
            })
        }

        const isMatch = await bcrypt.compare(String(password), String(user.password));

        if(!isMatch) {
            return res.status(400).json({
                status: false,
                msg: "Invalid credentials"
            })
        }

        const token = jwt.sign({
            id: user.id
        }, process.env.JWT_SECRET, {
            expiresIn: "7d" // 7 days
        });

        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60 * 24 * 7 * 1000 // 7 days
        });

        res.status(200).json({
            status: true,
            msg: "User logged in successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                image: user.image
            }
        });
        
    } catch (error) {
        console.error("Error in logging in user", error);
        res.status(500).json({
            status: false,
            msg: "Error in logging in user"
        });
    }
};

export const logout = async (req, res) => {
    
    try {
        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 0
        });

        res.status(200).json({
            status: true,
            msg: "User logged out successfully"
        });

    } catch (error) {
        console.error("Error in logging out user", error);
        res.status(500).json({
            status: false,
            msg: "Error in logging out user"
        });
    }
};

export const check = async (req, res) => {

    console.log(req.user);
    
    try {
        res.status(200).json({
            status: true,
            msg: "User is logged in",
            user: req.user
        });

    } catch (error) {
        console.error("Error in checking user", error);
        res.status(500).json({
            status: false,
            msg: "Error in checking user"
        });
    }
};