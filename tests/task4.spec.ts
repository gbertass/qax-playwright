import {test, expect } from '@playwright/test'
import { TaskModel } from './fixtures/task.model'
import { deteleTaskByHelper, postTask } from './support/helpers'
import { TasksPage } from './support/pages/tasks'
import data from './fixtures/tasks.json'

//arrumar os testes em describes para que fiquem mais organizados / suite de teste

test.describe('cadastro', () => {

    test('Cadastrar tarefa sem nome , campo obrigatório', async ({page}) => {
    
        const task = data.required as TaskModel
    
        const tasksPage: TasksPage = new TasksPage(page) //instancia a página
    
        await tasksPage.go()
        await tasksPage.create(task) //chamada da função create enviando elemento em branco
    
    
    
        const validationMessage = await tasksPage.inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)
        expect(validationMessage).toEqual('This is a required field')
    
    })
    
    test('Deve poder cadastrar uma nova tarefa4', async ({page, request}) => {
        
        const task = data.success as TaskModel
    
        await deteleTaskByHelper(request, task.name)
        
        const tasksPage: TasksPage = new TasksPage(page)
        await tasksPage.go()
        await tasksPage.create(task)
    
        await tasksPage.shouldHaveText(task.name)
    }) 
    
    
    test('Não deve permitir tarefa duplicada', async ({page, request}) => {
    
        const task = data.duplicate as TaskModel
    
        await deteleTaskByHelper(request, task.name)
        await postTask(request, task)
    
        const tasksPage: TasksPage = new TasksPage(page) //objeto que representa a página de tarefas e possui funções: 
    
        await tasksPage.go() //função que acessa
        await tasksPage.create(task) //função que cadastra
        await page.waitForLoadState('networkidle')
        await tasksPage.alertHaveText('Task already exists!') //função que verifica a existência de msg de erro
    
    })

})

test.describe('atualização', () => {

    test('Deve concuir a tarefa', async ({page, request}) => {
    
        const task = data.update as TaskModel
    
        await deteleTaskByHelper(request, task.name)
        await postTask(request,task)
    
        const tasksPage: TasksPage = new TasksPage(page) //instancia o pageObject
    
        await tasksPage.go()
    
        await tasksPage.toggle(task.name)
    
        await tasksPage.shouldBeDone(task.name)
    })
    
})

test.describe('Exclusão de item', () => {

    test('Deve deletar a tarefa', async ({page, request}) => {
    
        const task = data.delete as TaskModel //seleciona a tarefa certa .json
    
        await deteleTaskByHelper(request, task.name) //exluir e criar a tarefa para garantir massa de teste segura/estável
        await postTask(request,task)
    
        const tasksPage: TasksPage = new TasksPage(page) //instancia o pageObject
    
        await tasksPage.go()
    
        await tasksPage.remove(task.name)
    
        await tasksPage.shouldNotExist(task.name)
    })
    
})
