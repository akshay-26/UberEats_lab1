const assert = require("chai").assert;
const index = require("../index")
//H:\Course 273 Prof Simon Shim\Lab 1 Uber Eats\server\index.js
const chai = require("chai");
chai.use(require("chai-http"));
const expect = require("chai").expect;
const agent = require("chai").request.agent(index);
const router = require("express").Router();


describe("UberEats", function () {
  describe("Customer Login Test", function () {
    it("should return 'Invalid Credentails' when the username and password combination is incorrect", () => {
      agent
        .post("/uber-eats/api/LandingPage")
        .send({ useremail: "akshay@gmail.com", userpassword: "akshay123" })
        .then(function (res) {
          expect(res.text).to.include("Invalid Credentials");
        })
        .catch((error) => {
          console.log(error);
          assert.fail("An error occured. Please check the logs");
        });
    });


    it("should return user details when the username and password are correct", () => {
      agent
        .post("/uber-eats/api/LandingPage")
        .send({ useremail: "akshay@gmail.com", userpassword: "akshay" })
        .then(function (res) {
          expect(res.text).to.include('akshay@gmail.com');
        })
        .catch((error) => {
          console.log(error);
          assert.fail("An error occured. Please check the logs")
        });
    });
  });   

   describe("Restaurant Login Test", function () {
    it("should return 'Invalid Credentails' when the Restaurant email and password combination is incorrect", () => {
      agent
        .post("/uber-eats/api/RestaurantUser")
        .send({ useremail: "jack@gmail.com", userpassword: "jack123" })
        .then(function (res) {
          expect(res.text).to.include("Invalid Credentials");
        })
        .catch((error) => {
          console.log(error);
          assert.fail("An error occured. Please check the logs");
        });
    });

    it("should return Restaurant Email details when the Restaurant email and password are correct", () => {
        agent
          .post("/uber-eats/api/RestaurantUser")
          .send({ useremail: "jack@gmail.com", userpassword: "jack" })
          .then(function (res) {
            expect(res.text).to.include('jack@gmail.com');
          })
          .catch((error) => {
            console.log(error);
            assert.fail("An error occured. Please check the logs")
          });
      });
    });   

    describe("Customer Register Test", function () {
        it("User Already exists", () => {
          agent
            .post("/uber-eats/api/RegisterUser")
            .send({
              email: "user1@gmail.com",
              password: "user1",
              fullname: "user1",
            })
            .then(function (res) {
              expect(res.text).to.equal("Email Id is already registered");
            })
            .catch((error) => {
              console.log(error);
            });
        });
    
        it("Successful Signup", () => {
          agent
            .post("/uber-eats/api/RegisterUser")
            .send({
              email: "usertest@gmail.com",
              password: "usertest",
              fullname: "user test",
            })
            .then(function (res) {
              expect(res.text).to.include('usertest@gmail.com');
            })
            .catch((error) => {
              console.log(error);
            });
        });
      });


      describe("Restaurant Register Test", function () {
        it("User Already exists", () => {
          agent
            .post("/uber-eats/api/RegisterUser")
            .send({
              email: "popeyes@gmail.com",
              password: "popeyes",
              fullname: "popeyes",
            })
            .then(function (res) {
              expect(res.text).to.include("Email Id is already registered");
            })
            .catch((error) => {
              console.log(error);
            });
        });
    
        it("Restaurant Successful Signup", () => {
          agent
            .post("/uber-eats/api/RegisterUser/Restaurant")
            .send({
              email: "biryani@gmail.com",
              password: "biryani",
              fullname: "Veg Biryani",
            })
            .then(function (res) {
              expect(res.text).to.include('biryani@gmail.com');
            })
            .catch((error) => {
              console.log(error);
            });
        });
      });

      describe("Restaurant List", function () {
        it("Get a List of Restaurants", () => {
          agent
            .get("/uber-eats/api/Restaurant")
            .then(function (res) {
              expect(res.text).to.include("RestaurantName");
              
            })
            .catch((error) => {
              console.log(error);
            });
        });
    })
  
});

module.exports = router;