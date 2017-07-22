import 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';

import { createProfile, uploadProfile, viewProfiles } from '../Controllers/profiles.controller';
import { Profile } from '../Models/profiles.models';

describe('profiles controller create', function () {
 
    it('returns index view', async function () {

        let file = { path: 'test' }; 
        let body = { title:'test title', description: 'test description' };
        let req: any = {};

        let res: any = {
            render: sinon.stub()
        };
        
        await createProfile(req, res);

        sinon.assert.calledWith(res.render, 'index',{ layout: false , title: 'Please upload your application'});      
    });
});

describe('profiles controller', function() {
    let ProfileRecord = require('../Models/profiles.models').ProfileRecord;

    beforeEach(function() {
        sinon.stub(ProfileRecord, 'find');
    });

    afterEach(function() {
        ProfileRecord.find.restore();
    });


    it('should save a new profile', async function() {

        var expectedModels = [{}, {}];
        ProfileRecord.find.resolves(expectedModels);
        var req: any = { };
        var res: any = {
            json: sinon.stub()
        };

        await viewProfiles(req, res);

        sinon.assert.calledWith(res.json, expectedModels);
    });

});

describe('profiles controller upload', function () {
    let ProfileRecord = require('../Models/profiles.models').ProfileRecord;

    beforeEach(function () {
        sinon.stub(ProfileRecord.prototype, 'save');

        ProfileRecord.prototype.save.callsFake(function (this: Profile) {
            let currentRecord = this;

            return Promise.resolve(currentRecord);
        });
    });

    afterEach(function () {
        ProfileRecord.prototype.save.restore();
    });

    it('should create save and return Profile', async function () {

        let file = { path: 'test' }; 
        let body = { title:'test title', description: 'test description' };
        let req: any = { file, body };

        let createdModels: Partial<Profile> = {};
        let res: any = {
            json: (data: any) => createdModels = data
        };
        
        await uploadProfile(req, res);

        expect(createdModels.fileName).to.equal(file.path);
        expect(createdModels.title).to.equal(body.title);
        expect(createdModels.description).to.equal(body.description);
        
    });
});
