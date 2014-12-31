'use strict';


describe('Test suite with test factories', function() {

    var fpcontroller, spcontroller, tpcontroller, fpscope, spscope, tpscope, decfactory, rootscope;

    var vehicleInfoTest = {
        "vin":"test-vin",
        "vehicleType":"test-vehicleType",
        "model":"test-model",
        "brand":"test-brand",
        "wmi":"test-wmi-2",
        "year":2000
    }

    beforeEach(function() {
        module('app');
    });

    beforeEach(inject(function($controller, $rootScope, $injector) {
        rootscope = $rootScope;

        fpscope = rootscope.$new();
        spscope = rootscope.$new();
        tpscope = rootscope.$new();

        decfactory = $injector.get('decFactory', rootscope);

        fpcontroller = $controller('FirstPageCtrl', {
            $scope: fpscope,
            decFactory: decfactory
        });
        spcontroller = $controller('SecondPageCtrl', {
            $scope: spscope,
            decFactory: decfactory
        });
        tpcontroller = $controller('ThirdPageCtrl', {
            $scope: tpscope,
            decFactory: decfactory
        });
    }));

    describe('Test initiation of controllers', function () {
        it("This only tests the injection part of first page controller", function () {
            expect(fpcontroller).toBeDefined();
        });
        it("should correct state for switches in first page", function () {
            expect(fpscope.subscribedVehicleInfo).toBe(false);
            expect(fpscope.subscribedNavigation).toBe(false);
            expect(fpscope.subscribedNotification).toBe(false);
        });
        it("This only tests the injection part of second page controller", function () {
            expect(spcontroller).toBeDefined();
        });
        it("vehicle info should be defined", function () {
            expect(spscope.vehicleInfo).toBeDefined();
        });
        it("init values for vehicle info should be correct", function () {
            expect(spscope.vehicleInfo['vin']).toEqual("test-vin");
            expect(spscope.vehicleInfo['vehicleType']).toEqual("test-vehicleType");
            expect(spscope.vehicleInfo['model']).toEqual("test-model");
            expect(spscope.vehicleInfo['brand']).toEqual("test-brand");
            expect(spscope.vehicleInfo['year']).toEqual(2000);
        });
        it("init values navigation should be correct", function () {
            expect(tpscope.position['latitude']).toEqual(1.1);
            expect(tpscope.position['longitude']).toEqual(2.2);
            expect(tpscope.position['altitude']).toEqual("3");
            expect(tpscope.position['heading']).toEqual("4.4");
            expect(tpscope.position['precision']).toEqual("");
            expect(tpscope.position['velocity']).toEqual("5");
        });
        it("complicated way of testing promised for vehicle info", function () {

            // A little strange way to test subscription callback
            //expect(fpscope.subscribedVehicleInfo).toBe(false);
            //fpscope.subscribedVehicleInfo = true;
            //expect(fpscope.subscribedVehicleInfo).toBe(true);
            //expect(rootscope.asPromised).toBe(false);
            //rootscope.$digest();
            //expect(rootscope.asPromised).toBe(false);
            //rootscope.asPromised = false;
            //expect(rootscope.asPromised).toBe(false);
            //// Subscribe
            //fpscope.onChangeVI();
            //expect(rootscope.asPromised).toBe(false);
            //rootscope.$digest();
            //expect(rootscope.asPromised).toBe(false);
            //decfactory.postVehicleInfo(vehicleInfoTest);
            //expect(rootscope.asPromised).toBe(false);
            //rootscope.$digest();
            //expect(rootscope.asPromised).toBe(false);
            //rootscope.asPromised = false;

        });
    });



    //it("should inject dependencies", inject(function ($resource, fooVal) {
    //    expect($resource).toBeDefined();
    //    expect(fooVal).toBe(5);
    //}));
});
