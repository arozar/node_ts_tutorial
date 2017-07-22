import { Router, RequestHandler, Response, Request, Express } from 'express';
import * as path from 'path';
import { ProfileRecord, Profile } from '../Models/profiles.models';

export const createProfile = (req: Request, res: Response) => {
  res.render('index', { layout: false , title: 'Please upload your application' });
}

export const uploadProfile = async (req:Request & any, res: Response) => {

    const fileName = req.file.path;
    
    const newProfile: Profile = Object.assign(new ProfileRecord(), { fileName, ...req.body });

    const savedProfile = await newProfile.save();

    res.json(savedProfile);
}

export const viewProfiles = async (req: Request, res: Response) => {
  
  const profiles = await ProfileRecord.find({});
  
  res.json(profiles);

}