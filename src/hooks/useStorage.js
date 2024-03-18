const StorageType = {
    local: 'local',
    session: 'session'
};

export const useStorage = (prefix, storageType = StorageType.local) => {

    const selectedStorage = storageType === StorageType.local ? localStorage : sessionStorage;


    const saveToStorage = (prop, valeur) => {
        try {
            const newVal = typeof valeur === 'object' ? JSON.stringify(valeur) : valeur;
            selectedStorage.setItem(prefix + prop, newVal);
            return true;
        } catch(err) {
            console.log('[SAVE TO STORAGE ERROR]', err);
            return false;
        }
    } ;

    const getFromStorage = (prop) => {
        try {
            const val = selectedStorage.getItem(prefix + prop);
            if (val === null || typeof val === 'undefined') {
                return null;
            }
            try {
                if (val[0] === '[' || val[0] === '{') {
                    return JSON.parse(val);
                }
            } catch {
                // NOT JSON
                console.log('[Les valeurs ne doivent pas commencer par un { ou un [ si ce ne sont pas des tableaux/objets');
            }
            return val;
            
        } catch(err) {
            console.error('[GET FROM STORAGE ERROR]', err);
            return null;
        }
    }

    const removeFromStorage = (prop) => {
        try {
            selectedStorage.removeItem(prefix + prop);
            return true;
        } catch(err) {
            console.error('[REMOVE FROM STORAGE ERROR]', err);
            return false;
        }
    };

    const isStorageItemSet = (prop) => {
        return getFromStorage(prop) !== null;
    };

    return {
        saveToStorage,
        getFromStorage,
        removeFromStorage,
        isStorageItemSet
    };
};