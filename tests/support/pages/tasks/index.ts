import { Page, expect } from '@playwright/test'
import { TaskModel } from '../../../fixtures/task.model'

//classe que representa a página de tarefas 
export class TasksPage {
    readonly page: Page // propriedade somente de leitura 

    constructor(page: Page) { 
        this.page = page
    }
   
    async go() {
        await this.page.goto('http://localhost:8080/');
    }

    //função com a responsabilidade de criar tarefas
    async create(task: TaskModel){

        const inputTaskName = this.page.locator('input[class*=InputNewTask]') 
        await inputTaskName.fill(task.name) 
    
        await this.page.click('css=button >> text=Create')
        //
    }

    async shouldHaveText(taskName: string) {

        const target = this.page.locator(`css =.task-item p >> text=${taskName}`)
        await expect(target).toBeVisible();
    }

    async alertHaveText(text: string) {
        const target = this.page.locator('#swal2-html-container')
        await expect(target).toHaveText(text) //passa a ser possível testar outras mensagens de alerta se o sistema tiver - flexibilidade
        //await expect(target).toHaveText('Task already exists!') -> como era (essa mensagem agora é inserida na chamda da função)

    }
}