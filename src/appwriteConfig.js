import { Client, Databases , Account} from 'appwrite';

const client = new Client();

export const PROJECT_ID="65377ca9988060eaca24";
export const DATABASE_ID="65377d714d615206144b";
export const COLLECTION_ID_MESSAGES="65377d7aba77dcd6c2be";


client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65377ca9988060eaca24');

export const databases = new Databases(client);

export const account = new Account(client);

export default client;