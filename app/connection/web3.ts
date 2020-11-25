import Web3 from "web3";
import { config } from "../utils/config";
import logger from "../utils/logger";

const provider = `${config.web3_provider_host}:${config.web3_provider_port}`;
logger.debug(`Requesting connected to ${provider} HTTP Provider`);

const web3 = new Web3(new Web3.providers.HttpProvider(provider));
logger.info(`Successfully connected to ${provider} HTTP Provider`);

export default web3;
