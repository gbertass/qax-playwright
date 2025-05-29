import {test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { TaskModel } from './fixtures/task.model'
import { deteleTaskByHelper, postTask } from './support/helpers'
import { TasksPage } from './support/pages/tasks'


// async function deteleTaskByHelper(request: APIRequestContext, taskName: string){
//     await request.delete('http://localhost:3333/helper/tasks/' + taskName)
// }

// async function postTask(request: APIRequestContext, task: TaskModel ){
//     const newTask =  await request.post('http://localhost:3333/tasks', {data: task})
//     expect(newTask.ok()).toBeTruthy() 
// } EXPORTADOS PARA OUTRO FICHEIRO


test('Cadastrar tarefa sem nome , campo obrigatório', async ({page}) => {
    const task: TaskModel = {
        name: '', //vazio, para não enviar nenhum título
        is_done: false
    }

    const tasksPage: TasksPage = new TasksPage(page) //instancia a página

    await tasksPage.go()
    await tasksPage.create(task) //chamada da função create enviando elemento em branco



    const validationMessage = await tasksPage.inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)
    expect(validationMessage).toEqual('This is a required field')

})

test('Deve poder cadastrar uma nova tarefa4', async ({page, request}) => {
    
    const task: TaskModel = {
        name:'Ler um livro de TypeScript' ,
        is_done: false
    } 

    await deteleTaskByHelper(request, task.name)
    
    const tasksPage: TasksPage = new TasksPage(page)
    await tasksPage.go()
    await tasksPage.create(task)

    await tasksPage.shouldHaveText(task.name)
}) 


test('Não deve permitir tarefa duplicada', async ({page, request}) => {

    const task: TaskModel = {
        name:'Comprar livros de suspense',
        is_done: false
    } //tipando a minha massa de teste com a interface que representa o tipo de dado

    await deteleTaskByHelper(request, task.name)
    await postTask(request, task)

    const tasksPage: TasksPage = new TasksPage(page) //objeto que representa a página de tarefas e possui funções: 

    await tasksPage.go() //função que acessa
    await tasksPage.create(task) //função que cadastra
    await page.waitForLoadState('networkidle')
    await tasksPage.alertHaveText('Task already exists!') //função que verifica a existência de msg de erro

})

//assim o teste fica mais enxuto.