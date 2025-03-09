import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { ApplicationTypeEnums } from 'src/utils/enums.utils';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';
import { Transform } from 'class-transformer';

export class UpdateInfoDto {
    @ApiProperty({ required: true, example: `YourUserName`, description: "Tên đăng nhập" })
    @Transform(lowerCaseTransformer)
    @IsNotEmpty({ message: "Tên đăng nhập ko được để trống" })
    UserName: string = null;

    @ApiProperty({ required: true, example: `YourName`, description: "Tên hiển thị" })
    @IsNotEmpty({ message: "Tên hiển thị ko được để trống" })
    DisplayName: string | null;

    ApplicationType: ApplicationTypeEnums;

    // @ApiProperty({ example: "123456" })
    // Password: string | null;

    // @ApiProperty({ example: "123456" })
    // RePassword: string | null;

    // @ApiProperty({ example: `false` })
    // @IsBoolean()
    // IsAdmin: boolean;

}
