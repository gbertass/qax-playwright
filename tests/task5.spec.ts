import {test, expect } from '@playwright/test'
import { TaskModel } from './fixtures/task.model'
import { deteleTaskByHelper, postTask } from './support/helpers'
import { TasksPage } from './support/pages/tasks'
import data from './fixtures/tasks.json'

let tasksPage: TasksPage

test.beforeEach(({page}) => {
    tasksPage = new TasksPage(page) //instancia o pageObject
})

test.describe('cadastro', () => {

    test('Cadastrar tarefa sem nome , campo obrigatório', async () => {
    
        const task = data.required as TaskModel
    
        await tasksPage.go()
        await tasksPage.create(task) //chamada da função create enviando elemento em branco
    
    
    
        const validationMessage = await tasksPage.inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)
        expect(validationMessage).toEqual('This is a required field')
    
    })
    
    test('Deve poder cadastrar uma nova tarefa4', async ({request}) => {
        
        const task = data.success as TaskModel
    
        await deteleTaskByHelper(request, task.name)

        await tasksPage.go()
        await tasksPage.create(task)
    
        await tasksPage.shouldHaveText(task.name)
    }) 
    
    
    test('Não deve permitir tarefa duplicada', async ({request}) => {
    
        const task = data.duplicate as TaskModel
    
        await deteleTaskByHelper(request, task.name)
        await postTask(request, task) 
    
        await tasksPage.go() //função que acessa
        await tasksPage.create(task) //função que cadastra

        await tasksPage.alertHaveText('Task already exists!') //função que verifica a existência de msg de erro
    
    })

})

test.describe('atualização', () => {

    test('Deve concuir a tarefa', async ({request}) => {
    
        const task = data.update as TaskModel
    
        await deteleTaskByHelper(request, task.name)
        await postTask(request,task)
    
        await tasksPage.go()
    
        await tasksPage.toggle(task.name)
    
        await tasksPage.shouldBeDone(task.name)
    })
    
})

test.describe('Exclusão de item', () => {

    test('Deve deletar a tarefa', async ({request}) => {
    
        const task = data.delete as TaskModel //seleciona a tarefa certa .json
    
        await deteleTaskByHelper(request, task.name) //exluir e criar a tarefa para garantir massa de teste segura/estável
        await postTask(request,task)
    
        await tasksPage.go()
    
        await tasksPage.remove(task.name)
    
        await tasksPage.shouldNotExist(task.name)
    })
    
})
