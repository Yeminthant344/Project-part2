
describe('Student Management', () => {
  let baseUrl;

  before(() => {
    cy.task('startServer').then((url) => {
      baseUrl = url; 
      cy.visit(baseUrl);
    });
  });

  after(() => {
    return cy.task('stopServer'); 
  });

  it('should view all students', () => {
    
    cy.visit(baseUrl);

    cy.get('button').contains('View Students').click();

    cy.wait(1000); 

  });


  it('should search for a student', () => {
    cy.visit(baseUrl);

    
    const searchQuery = 'Jonny Kim1';
    cy.get('#searchInput').type(searchQuery);
    cy.wait(1000);
    // Verify that the search results include the query
    cy.get('#tableContent').find('tr').each(($row) => {
      cy.wrap($row).contains(searchQuery, { matchCase: false }).should('exist');
    });

    
    cy.get('#searchInput').clear();

    
    cy.get('#tableContent').find('tr').its('length').should('be.gt', 0);
  });

  it('should delete a student', () => {
    cy.visit(baseUrl);

    
    cy.get('button').contains('View Students').click();

    
    cy.wait(1000);

    
    cy.get('#tableContent')
      .find('tr')
      .first() 
      .find('button')
      .contains('Delete')
      .click();
    cy.get('#tableContent').find('tr').should('have.length', 5);  
  });


});
