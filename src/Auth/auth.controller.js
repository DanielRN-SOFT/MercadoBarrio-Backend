import prisma from "../../prismaClient";
import bcrypt from "bcryptjs";
import generateToken from "../helpers/generateToken";
const authUser = (req, res) => {
    const {email, password} = req.body
    const user = await prisma.usuarios.findUnique({where: {email}});

    if(user && await bcrypt.compare(password, user.password)){
        generateToken(res, user.id);

        res.json({
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            roles_id: user.roles_id
        })
    }else{
        res.status(401);
        throw new Error("Email o Password invalido");
    }
}

const registerUser = (req, res) => {
    const {name, email, password} = req.body;

}