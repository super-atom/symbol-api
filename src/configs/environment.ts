import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';

export default dotenvExpand(dotenv.config());