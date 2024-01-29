it('titles are correct', () => {
    const page = cy.visit('http://localhost:4321');

    page.get('title').should('have.text', 'Astrocket')
    page.get('h1').should('have.text', 'Astrocket');
});

describe('Header Component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4321');
    });

    it('renders the logo', () => {
        cy.get('a[aria-label="home"]').should('exist');
    });

    it('renders the title', () => {
        cy.get('h1').should('contain.text', 'Astrocket');
    });

    it('renders the login button', () => {
        cy.get('a[aria-label="login"]').should('exist');
    });

    it('navigates to home page when logo is clicked', () => {
        cy.get('a[aria-label="home"]').click();
        cy.url().should('include', '/');
    });

    it('navigates to login page when login button is clicked', () => {
        cy.get('a[aria-label="login"]').click();
        cy.url().should('include', '/login');
    });
});

describe('Button Behavior', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4321');
    });

    it('home button redirects to home page', () => {
        cy.get('a[aria-label="home"]').click();
        cy.url().should('include', '/');
    });

    it('login button redirects to login page', () => {
        cy.get('a[aria-label="login"]').click();
        cy.url().should('include', '/login');
    });
});

describe('Button Prefetching', () => {
    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:4321/').as('homePage');
        cy.visit('http://localhost:4321');
    });

    it('home button prefetches the home page when hovered', () => {
        cy.get('a[aria-label="home"]').trigger('mouseover');
        cy.wait('@homePage');
    });

    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:4321/login').as('loginPage');
        cy.visit('http://localhost:4321');
    });

    it('login button prefetches the login page when hovered', () => {
        cy.get('a[aria-label="login"]').trigger('mouseover');
        cy.wait('@loginPage');
    });
});