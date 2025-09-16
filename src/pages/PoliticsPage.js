import { BasePage } from './BasePage.js';

export class PoliticsPage extends BasePage {
  async openPage() {
    await this.open('https://inews.co.uk/category/news/politics');
  }
}
