describe("Hotel Price Comparison", () => {
    before(() => {
      cy.visit("https://www.almosafer.com/en");
    });
  
    it("Select a city, filter by price, and compare", () => {
        cy.get('.cta__saudi').click();
     
      cy.get('#uncontrolled-tab-example-tab-hotels').click();
  
      
      const randomCity = ["dubai", "jeddah", "amman"][Math.floor(Math.random() * 3)];
      cy.get('[data-testid="AutoCompleteInput"]').type(randomCity);
  
      
      cy.get('[data-testid="HotelSearchBox__SearchButton"]').click();
      cy.wait(10000); 
   
      cy.get('[data-testid="HotelSearchResult__sort__LOWEST_PRICE"]').click();
      cy.wait(14000);
    
      cy.get('[data-testid="HotelSearchResult__Hotel0__PriceLabel"] > .Price__Value').invoke("text").as("firstPrice");
      cy.get('[data-testid="HotelSearchResult__Hotel39__PriceLabel"] > .Price__Value').invoke("text").as("lastPrice");
  
  
      cy.get("@firstPrice").then((firstPrice) => {
        cy.get("@lastPrice").then((lastPrice) => {
          const firstPriceNumber = parseFloat(firstPrice.replace("SAR", "").replace(",", "").trim());
          const lastPriceNumber = parseFloat(lastPrice.replace("SAR", "").replace(",", "").trim());
          
         
          expect(firstPriceNumber).to.be.lessThan(lastPriceNumber);
        });
      });
    });
  });
  