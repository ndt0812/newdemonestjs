import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

class Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [];

@Controller('auth')
export class AuthController {
  // constructor(private readonly authService: AuthService) { }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Return all products.' })
  getAll(): Product[] {
    return products;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({ status: 200, description: 'Return product by ID.' })
  getById(@Param('id') id: number): Product {
    return products.find(p => p.id === Number(id));
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  create(@Body() product: Product): string {
    products.push({ ...product, id: products.length + 1 });
    return 'Product created successfully';
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product' })
  update(@Param('id') id: number, @Body() product: Product): string {
    const index = products.findIndex(p => p.id === Number(id));
    if (index !== -1) products[index] = product;
    return 'Product updated successfully';
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  delete(@Param('id') id: number): string {
    const index = products.findIndex(p => p.id === Number(id));
    if (index !== -1) products.splice(index, 1);
    return 'Product deleted successfully';
  }
}
