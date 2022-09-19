import { Injectable, NotFoundException } from '@nestjs/common';
import * as mime from 'mime-types';
import * as fs from 'fs';
import { FileDto } from './dto/file.dto';


@Injectable()
export class FilesService {


    private readonly fileDir = 'private/resources';


    //Gets
    get(filename: string): FileDto {
        let path = `${this.fileDir}/${filename}`;
        if(!fs.existsSync(path))
            throw new NotFoundException(`File ${filename} not found`);

        return Object.assign(new FileDto, {
            contentType: mime.lookup(path),
            data: this.readResource(path)
        })
    }

    getList(): string[] {
        return [];
    }


    //Methods
    readResource(path: string): Buffer {
        let data: Buffer;
        fs.readFile(path, (data) => data);
        return data;
    }
}
