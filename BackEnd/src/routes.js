import { Router } from "express";
import {insertUsuario, updateUsuario, selectUsuarios, selectUsuario, deleteUsuario, autorizarUser, logar} from './Controler/Pessoa.js';

import { authToken } from './authToken.js';

const router = Router();



router.get('/', (req, res) => {
    res.json({
        "statusCode": 200,
        "msg": "API Funcionando"
    })
});



router.get('/users', selectUsuarios);//Leitura de todas as pessoas//feito
router.get('/user/:id', selectUsuario);//Leitura de uma pessoa pelo id//feito
router.put('/user', updateUsuario);//Atualização dos dados de uma pessoa
router.post('/user', insertUsuario);//Inserção de uma nova pessoa//feito
router.delete('/user/:id', deleteUsuario);//Deleção de uma pessoa//feito
router.get('/protected',authToken, autorizarUser);//Rota protegida
router.post('/login/:user', logar);//Rota de login

export default router;