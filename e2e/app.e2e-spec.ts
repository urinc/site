import { P0308Page } from './app.po';

describe('p0308 App', () => {
  let page: P0308Page;

  beforeEach(() => {
    page = new P0308Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
