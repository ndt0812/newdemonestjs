import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Transform } from "class-transformer";
import { lowerCaseTransformer } from "src/utils/transformers/lower-case.transformer";

export class CreateAuthDto {
    Id: number

    @ApiProperty({ required: true, example: `admin`, description: "Tên đăng nhập" })
    @IsNotEmpty({ message: "Tên đăng nhập ko được để trống" })
    @Transform(lowerCaseTransformer)
    UserName: string;

    @ApiProperty({ required: true, example: "123456", minLength: 6, description: 'Mật khẩu' })
    @IsNotEmpty({ message: "Mật khẩu ko được để trống" })
    Password: string;

    RoleId: number
}
