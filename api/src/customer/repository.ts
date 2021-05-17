import { EntityRepository, Repository } from "typeorm";
import { CustomerEntity } from "@ai/database/dist/entity/customer";
import { Service } from "typedi";

@Service()
@EntityRepository(CustomerEntity)
export class CustomerRepository extends Repository<CustomerEntity> {}
