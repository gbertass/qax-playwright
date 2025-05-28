import {test, expect} from '@playwright/test'

test('Deve poder cadastrar uma nova tarefa', async ({page}) => {
    
    await page.goto('http://localhost:8080/');
    
    //preenche um campo localizando um elemento pelo id
    await page.fill('#newTask', 'Ler um livro de TypeScript') 
})
    
test('Deve poder cadastrar uma nova tarefa2', async ({page}) => {
    
    await page.goto('http://localhost:8080/');
    
    //preenche um campo localizando o elemento placeholder
    await page.fill('input[placeholder ="Add a new Task"]', 'Ler um livro de TypeScript') 
    //quando busco um do elemento e o  valor da propriedade tem espaço ou chars especiais, ele deve estar ente " ".
    //nesse caso o valor do placeholder contém espaço. 
})

test('Deve poder cadastrar uma nova tarefa3', async ({page}) => {
    
    await page.goto('http://localhost:8080/');
    
    //preenche um campo localizando o elemento pela classe (o '.' significa que isso é uma classe).
    await page.fill('._listInputNewTask_1y0mp_21', 'Ler um livro de TypeScript') 
    //algumas classes possuem valores que podem ser alterados após mudanças de versões (neste caso, _1y0mp_21).
    //também é possível selecionar a classe pelo seu elemento fixo usando expressão regular (funciona com qualquer elemento) ->  input[class*=InputNewTask]
}) 

test('Deve poder cadastrar uma nova tarefa4', async ({page}) => {
    
    await page.goto('http://localhost:8080/');
    
    //localizando a clasen pelo seu elemento fixo
    //page.locator é a definição de um objeto, por isso deve ser guardado em uma constante
    const inputTaskName = page.locator('input[class*=InputNewTask]') 
    await inputTaskName.fill('Ler um livro de TypeScript')

    await page.click('xpath= //button[contains(text(), "Create"]')
}) 
