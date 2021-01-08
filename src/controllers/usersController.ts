import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import userView from '../views/users_view'
import * as Yup from 'yup'

import User from '../models/User'

export default {

  async show(request: Request, response: Response) {
      const { id } = request.params;
      
      const usersRepository = getRepository(User);

      const user = await usersRepository.findOneOrFail(id);

      return response.json(userView.render(user))
  },

  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const data = { email, password };

    const schema = Yup.object().shape({
      email: Yup.string().required('Email obrigatório'),
      password: Yup.string()
        .required('Senha obrigatória') 
        .test('len', 'A senha deve ter entre 8 e 30 caracteres', 
          (val: any) => val.length > 7 && val.length < 31)
    })

    await schema.validate(data, {
      abortEarly: false
    });

    const user = new User();
    user.email = email;
    user.password = password;

    //Hash the password, to securely store on DB
    user.hashPassword();

    //Try to save. If fails, the email is already in use
    const usersRepository = getRepository(User);
    try {
      await usersRepository.save(user);
    } catch (e) {
      response.status(409).send('email already in use');
      return;
    }
    
    return response.status(201).send('user created');
  },

  async update(request: Request, response: Response) {
    const { id } = request.params
    const { email, password } = request.body;

    const data = { email, password };

    const schema = Yup.object().shape({
      email: Yup.string().required('Email obrigatório'),
      password: Yup.number()
        .required('Senha obrigatória')
        .min(8, 'A senha deve conter pelo menos 8 dígitos')
        .max(30, 'Tamanho máximo da senha atingido'),
    })

    await schema.validate(data, {
        abortEarly: false
    });

    let user;

    //Try to find user on database
    const usersRepository = getRepository(User);
    try {
      user = await usersRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      response.status(404).send('User not found');
      return;
    }

    user.email = email;
    user.password = password;

    //Try to safe, if fails, that means username already in use
    try {
      await usersRepository.save(user);
    } catch (e) {
      response.status(409).send('username already in use');
      return;
    }
    //After all send a 204 (no content, but accepted) response
    response.status(204).send('User updated');
  },

  async delete(request: Request, response: Response) {
    const { id } = request.params

    const usersRepository = getRepository(User);
    try{
      await usersRepository.findOneOrFail(id);
    } catch(error) {
      return response.status(404).send('User does not exist');
    }
    usersRepository.delete(id);
    return response.status(202).send('User removed');
  }
}