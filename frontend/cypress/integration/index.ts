beforeEach(() => {
  cy.visit("http://localhost:3000");
});

describe("Product Listing", () => {
  it("Shows products", () => {
    cy.findAllByRole("article").should("have.length.at.least", 5);
  });
  it("Adds favorites", () => {
    cy.findAllByRole("article")
      .first()
      .findByRole("button", { name: /Voeg toe aan favorieten/i })
      .click();
    cy.findByTestId("favorites-amount").should("have.text", "1");
  });
});

describe("Favorite list", () => {
  it("Shows favorites", () => {
    // Add favorite so the amount updates
    cy.findAllByRole("article")
      .first()
      .findByRole("button", { name: /Voeg toe aan favorieten/i })
      .click();

    cy.findByLabelText("Favorieten").click();

    cy.findByText("Favorieten").should("be.visible");

    // Updates amount of favorites
    cy.findByRole("button", { name: /verwijder favoriet/i }).should(
      "be.visible"
    );

    cy.findByRole("spinbutton").type("{selectAll}8").blur();
    cy.findByRole("button", { name: /close/i }).click();

    cy.findByTestId("favorites-amount").should("have.text", "8");

    // Removes favorites
    cy.findByLabelText("Favorieten").click();

    cy.findByRole("button", { name: /verwijder favoriet/i }).click();

    cy.findByRole("button", { name: /close/i }).click();

    cy.findByTestId("favorites-amount").should("not.exist");
  });
});

export {};
