describe("Outer describe", function() {
    before(function() {
        // tslint:disable-next-line:no-console
        console.log("in outer beforeAll");
    });

    beforeEach(function() {
        // tslint:disable-next-line:no-console
        console.log("in outer beforeEach");
    });

    it("spec A", function() {
        // tslint:disable-next-line:no-console
        console.log("in spec A");
    });

    it("spec B", function() {
        // tslint:disable-next-line:no-console
        console.log("in spec B");
    });

    describe("inner describe", function() {
        before(function() {
            // tslint:disable-next-line:no-console
            console.log("in inner beforeAll");
        });

        beforeEach(function() {
            // tslint:disable-next-line:no-console
            console.log("in inner beforeEach");
        });

        it("spec C", function() {
            // tslint:disable-next-line:no-console
            console.log("in spec A");
        });

        it("spec D", function() {
            // tslint:disable-next-line:no-console
            console.log("in spec B");
        });
    });
});
