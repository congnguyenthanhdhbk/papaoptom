import {Query, Resolver} from '@nestjs/graphql';

@Resolver()
export class ProductResolver {
    @Query(() => String)
    async hello() {
        return "Hello";
    }
}
