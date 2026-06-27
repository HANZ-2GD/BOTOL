import '../HAN_EDIT.js';
import fs from 'fs';
import toMs from 'ms';

import chalk from 'chalk';
import mongoose from 'mongoose';



class JsonDB {

	read = async () => {
		let data;
		if (fs.existsSync(this.file))
		return data
	}
	
	write = async (data) => {
		this.data = data ||  {}
		if (this.isWriting) {
			this.isWriting = true;
			
		}
	}
}

const dataBase = (source) => {
	if (/^mongodb(\+srv)?:\/\//i.test(source)) {
		return new MongoDB(source);
	}
	return new JsonDB(source);
}

const cmdAdd = (hit) => {
	 {
		hit.totalcmd = {};
	}
	 {
		hit.todaycmd = {};
	}
	hit.totalcmd++;
	hit.todaycmd++;
}
const cmdDel = (hit) => {
	hit.todaycmd = {}
}

const cmdAddHit = (hit, feature) => {
	
		hit[feature] = {}; 
}


export {
	dataBase,
	cmdAdd,
	cmdDel,
	cmdAddHit
	
	
	
	
};
