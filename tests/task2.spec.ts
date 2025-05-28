import {test, expect, APIRequestContext} from '@playwright/test'
import { faker } from '@faker-js/faker'
import { TaskModel } from './fixtures/class.model'


// interface TaskModel {
//     name: string
//     is_done: boolean
// } //cria uma interface em typeScript para representar a modelagem de dados da minha massa de testes

async function deteleTaskByHelper(request: APIRequestContext, taskName: string){
    await request.delete('http://localhost:3333/helper/tasks/' + taskName)
}

async function postTask(request: APIRequestContext, task: TaskModel ){
    const newTask =  await request.post('http://localhost:3333/tasks', {data: task})
    expect(newTask.ok()).toBeTruthy() 
}

test('Deve poder cadastrar uma nova tarefa4', async ({page, request}) => {
    
    const task: TaskModel = {
        name:'Ler um livro de TypeScript' ,
        is_done: false
    } 
    await deteleTaskByHelper(request, task.name)
    await page.goto('http://localhost:8080/');
    
    //localizando a clasen pelo seu elemento fixo
    //page.locator é a definição de um objeto, por isso deve ser guardado em uma constante
    const inputTaskName = page.locator('input[class*=InputNewTask]') 

    await inputTaskName.fill(task.name) // padão de preenchimento de campo

   //await page.click('xpath= //button[contains(text(), "Create"]')

    //recurso exclusivo do playright para substituir o xpath:
    await page.click('css=button >> text=Create')


    const target = page.locator(`css =.task-item p >> text=${task.name}`)
    //const target = page.getByTestId('task-item') // nem toda app web costuma ter o testID - quando tiver, é um meio seguro de encontrar os elementos desejados
    await expect(target).toBeVisible();
}) 

// test.only('não deve permitir tarefa duplicada', async ({page}) => {

//     //neste caso, esse teste tem uma dependêcia ao teste anterior. Para evitar essa situações, devemos ter testes que conseguem realizar a execução completa dentro deles mesmos.
//     await page.goto('http://localhost:8080/')

//     const inputTaskName = page.locator('input[class*=InputNewTask]') 
//     await inputTaskName.fill(taskName) // padão de preenchimento de campo
//     await page.click('css=button >> text=Create')

//     const target = page.locator('.swal2-html-container')
//     await expect(target).toHaveText('Task already exists!')
// })


test.only('não deve permitir tarefa duplicada', async ({page, request}) => {

   //criar um objeto com as propriedades que sabemos que a requisição post tem atraves do Insomnia(API)
   //depois, como perdemos a contante taskName, passamos para os testes o acesso diretamente ao 'name' do objeto com task.name
//    const task = {
//         name: 'Comprar livros de suspense',
//         is_done: false 
//     } //tipo de objeto usado pela api para os dados -> isso foi usado anteriormente, mas agora vamos aprimorar
    
const task: TaskModel = {
    name:'Comprar livros de suspense',
    is_done: false
} //tipando a minha massa de teste com a interface que representa o tipo de dado

    await request.delete('http://localhost:3333/helper/tasks/' + task.name)// antes de iniciar o teste, removo a task via api helper
   
    //TRECHO REFATORADO PARA DENTRO DE FUNÇÃO - FICA SÓ O EXEMPLO DE COMO TAMBÉM PODE SER
    const newTask =  await request.post('http://localhost:3333/tasks', {data: task})
    expect(newTask.ok()).toBeTruthy() 
    //ok() é uma função que retorna o status code "OK" (status 200)
    //cadastrar a tarefa previamente e vai garantir que essa etapa foi executada com sucesso antes de seguir com os outros steps

    await page.goto('http://localhost:8080/')

    const inputTaskName = page.locator('input[class*=InputNewTask]') 
    await inputTaskName.fill(task.name) // padão de preenchimento de campo
    await page.click('css=button >> text=Create')


    // await inputTaskName.fill(taskName) // repetindo a tarefa pelo front-end
    // await page.click('css=button >> text=Create')

    const target = page.locator('.swal2-html-container')
    await expect(target).toHaveText('Task already exists!')

    //esse teste esta bem feito para simular toda a duplicidade e conseguir observar corretamente o comportamento do sistema
    //porém isso está escrevendo duas vezes a tarefa atraves do front-end. Havendo acesso a API, devemos fazer essa tarefa por lá (mais rápido)
    
})

test.only('não deve permitir tarefa duplicada', async ({page, request}) => {

   //criar um objeto com as propriedades que sabemos que a requisição post tem atraves do Insomnia(API)
   //depois, como perdemos a contante taskName, passamos para os testes o acesso diretamente ao 'name' do objeto com task.name
//    const task = {
//         name: 'Comprar livros de suspense',
//         is_done: false 
//     } //tipo de objeto usado pela api para os dados -> isso foi usado anteriormente, mas agora vamos aprimorar
    
const task: TaskModel = {
    name:'Comprar livros de suspense',
    is_done: false
} //tipando a minha massa de teste com a interface que representa o tipo de dado

    await request.delete('http://localhost:3333/helper/tasks/' + task.name)// antes de iniciar o teste, removo a task via api helper
   
    //TRECHO REFATORADO PARA DENTRO DE FUNÇÃO - FICA SÓ O EXEMPLO DE COMO TAMBÉM PODE SER
    const newTask =  await request.post('http://localhost:3333/tasks', {data: task})
    expect(newTask.ok()).toBeTruthy() 
    //ok() é uma função que retorna o status code "OK" (status 200)
    //cadastrar a tarefa previamente e vai garantir que essa etapa foi executada com sucesso antes de seguir com os outros steps

    await page.goto('http://localhost:8080/')

    const inputTaskName = page.locator('input[class*=InputNewTask]') 
    await inputTaskName.fill(task.name) // padão de preenchimento de campo
    await page.click('css=button >> text=Create')


    // await inputTaskName.fill(taskName) // repetindo a tarefa pelo front-end
    // await page.click('css=button >> text=Create')

    const target = page.locator('.swal2-html-container')
    await expect(target).toHaveText('Task already exists!')

    //esse teste esta bem feito para simular toda a duplicidade e conseguir observar corretamente o comportamento do sistema
    //porém isso está escrevendo duas vezes a tarefa atraves do front-end. Havendo acesso a API, devemos fazer essa tarefa por lá (mais rápido)
    
})
