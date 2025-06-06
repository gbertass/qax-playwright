import {expect, APIRequestContext } from '@playwright/test'

import {TaskModel} from '../fixtures/task.model'



export async function deteleTaskByHelper(request: APIRequestContext, taskName: string){
    await request.delete('http://localhost:3333/helper/tasks/' + taskName)
}

export async function postTask(request: APIRequestContext, task: TaskModel ){
    const newTask =  await request.post('http://localhost:3333/tasks', {data: task})
    expect(newTask.ok()).toBeTruthy() 
}


// //Quando uso o .env

// require('dotenv').config() //para ter acesso as variáveis de ambiente criadas no arquivo .env

// const BASE_API = process.env.BASE_API 
// //process.env é um comando de node para dar acesso as variáveis de ambiente

// export async function deteleTaskByHelper(request: APIRequestContext, taskName: string){
//     await request.delete(`${BASE_API}/helper/tasks/ ${taskName}`)
// }

// export async function postTask(request: APIRequestContext, task: TaskModel ){
//     const newTask =  await request.post(`${BASE_API}/tasks`, {data: task})
//     expect(newTask.ok()).toBeTruthy() 
// }