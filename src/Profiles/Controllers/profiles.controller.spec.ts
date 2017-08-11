import 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as mongoose from 'mongoose';

import { createProfile, uploadProfile, viewProfiles } from '../Controllers/profiles.controller';
import { Profile, ProfileRecord } from '../Models/profiles.models';

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
    let ProfileRecord: mongoose.Model<Profile> = require('../Models/profiles.models').ProfileRecord;

    beforeEach(function() {
        sinon.stub(ProfileRecord, 'find');
    });

    afterEach(function() {
        (ProfileRecord.find as sinon.SinonStub).restore();
    });

    it('should return expected models', async function() {

        var expectedModels = [{}, {}];
        (ProfileRecord.find as sinon.SinonStub).resolves(expectedModels);
        var req: any = { };
        var res: any = {
            json: sinon.stub()
        };

        await viewProfiles(req, res);

        sinon.assert.calledWith(res.json, expectedModels);
    });
});

describe('profiles controller upload', function () {
    const ProfileRecord: mongoose.Model<Profile> = require('../Models/profiles.models').ProfileRecord;
    
    const ProfilePrototype: mongoose.Document = ProfileRecord.prototype;
    
    beforeEach(function () {
        sinon.stub(ProfileRecord.prototype, 'save');

        (ProfilePrototype.save as sinon.SinonStub).callsFake(function (this: Profile) {
            let currentRecord = this;

            return Promise.resolve(currentRecord);
        });
    });

    afterEach(function () {
        (ProfilePrototype.save as sinon.SinonStub).restore();
    });

    it('should call save ', async function () {

        let file = { path: 'test' }; 
        let body = { title:'test title', description: 'test description' };
        let req: any = { file, body };

        let createdModels: Partial<Profile> = {};
        let res: any = {
            json: (data: any) => createdModels = data
        };
        
        await uploadProfile(req, res);

        sinon.assert.called(ProfileRecord.prototype.save);        
    });

    it('should create, save and return Profile', async function () {

        let file = { path: 'test' }; 
        let body = { title:'test title', description: 'test description' };
        let req: any = { file, body };

        let createdModel: Partial<Profile> = {};
        let res: any = {
            json: (data: any) => createdModel = data
        };
        
        await uploadProfile(req, res);

        expect(createdModel.fileName).to.equal(file.path);
        expect(createdModel.title).to.equal(body.title);
        expect(createdModel.description).to.equal(body.description);       
    });
});
