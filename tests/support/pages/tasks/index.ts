import { Locator, Page, expect } from '@playwright/test'
import { TaskModel } from '../../../fixtures/task.model'

//classe que representa a página de tarefas 
export class TasksPage {
    readonly page: Page // propriedade somente de leitura 
    readonly inputTaskName: Locator

    constructor(page: Page) { 
        this.page = page
        this.inputTaskName = page.locator('input[class*=InputNewTask]')
    }
   
    async go() {
        await this.page.goto('http://localhost:8080/');
    }

    //função com a responsabilidade de criar tarefas
    async create(task: TaskModel){
        await this.inputTaskName.fill(task.name) 
    
        await this.page.click('css=button >> text=Create')
        //
    }

    async shouldHaveText(taskName: string) {

        const target = this.page.locator(`css =.task-item p >> text=${taskName}`)
        await expect(target).toBeVisible();
    }

    async alertHaveText(text: string) {
        const target = this.page.locator('#swal2-html-container')
        await this.page.waitForLoadState('networkidle')

        await expect(target).toBeVisible({timeout: 1000});
        await expect(target).toHaveText(text) //passa a ser possível testar outras mensagens de alerta se o sistema tiver - flexibilidade
        //await expect(target).toHaveText('Task already exists!') -> como era (essa mensagem agora é inserida na chamda da função)

    }

    async toggle(taskName: string) {
        const target = this.page.locator(`xpath=//p[text()="${taskName}"]/..//button[contains(@class,"Toggle")] `)
        await target.click()
    }

    async shouldBeDone(taskName: string){
        //função que vai buscar o elemento pelo texto e em seguida vai verificar se esse elemento que
        //é o parágrafo tem a propriedade CSS (text-decoration..) com o valor line-through
        const target = this.page.getByText(taskName)
        await expect(target).toHaveCSS('text-decoration-line', 'line-through')
    }


    async remove(taskName: string) {
        const target = this.page.locator(`xpath=//p[text()="${taskName}"]/..//button[contains(@class,"Delete")] `)
        await target.click()
    }

    async shouldNotExist(taskName: string) {

        const target = this.page.locator(`css =.task-item p >> text=${taskName}`)
        await expect(target).not.toBeVisible();
    }

}