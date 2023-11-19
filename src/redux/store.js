import { combineReducers, createStore } from 'redux';
import { contactsReducer } from './contacts/contacts.reducer';
import { filtersReducer } from './filters/filters.reducer';


const rootReducer = combineReducers({
   contactsStore: contactsReducer,
   filtersStore: filtersReducer
})

export const store = createStore(rootReducer);


