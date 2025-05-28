import {test, expect} from '@playwright/test'
import { faker } from '@faker-js/faker'


test('Deve poder cadastrar uma nova tarefa4', async ({page, request}) => {
    
    // Dado que eu tenho uma nova tarefa
    const taskName = 'Ler um livro de TypeScript' //crio uma constante para guaradar a informação e reutilizá-la ao longo do código
    await request.delete('http://localhost:3333/helper/tasks/' + taskName)// antes de iniciar o teste, removo a task via api helper
    
    //E que estou na página de cadastro
    await page.goto('http://localhost:8080/');
    
   //Quando faço o cadastro dessa tarefa
    const inputTaskName = page.locator('input[class*=InputNewTask]') //localizando a classe pelo seu elemento fixo
    await inputTaskName.fill(taskName) // padrão de preenchimento de campo
    await page.click('css=button >> text=Create')

    //Então essa tarefa deve ser exibida na lista
    const target = page.locator(`css =.task-item p >> text=${taskName}`)
    //const target = page.getByTestId('task-item') // nem toda app web costuma ter o testID - quando tiver, é um meio seguro de encontrar os elementos desejados
    await expect(target).toBeVisible();
}) 
