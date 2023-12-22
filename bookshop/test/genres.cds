using { com.bookshop as my } from '../db/schema';
service TestService {
  entity Genres as projection on my.Genres;
}
