import {
    ObservableCollection,
    CollectionChangeAction,
    CollectionChangeInfo
} from '../src/observableCollection';


describe('ObservableCollection', () => {
    it('should add element', () => {
        const collection = new ObservableCollection<string>();
        expect(collection.numElements).toBe(0);
        let collectionChangeInfo: CollectionChangeInfo | null = null;
        collection.collectionChanged.on('collectionChange', (info: CollectionChangeInfo) => {
            collectionChangeInfo = info;
        });
        collection.addItem("Item");
        expect(collection.numElements).toBe(1);
        expect(collection.getItemAt(0)).toBe("Item");
        expect(collectionChangeInfo).toBeTruthy();
        expect(collectionChangeInfo!.action).toBe(CollectionChangeAction.Add);
        expect(collectionChangeInfo!.newIndex).toBe(0);
        expect(collectionChangeInfo!.newItems).toEqual(["Item"]);
    });
    it('should remove element', () => {
        let collection: ObservableCollection<string> = new ObservableCollection<string>();
        collection.addItem("Item 1");
        collection.addItem("Item 2");
        let collectionChangeInfo: CollectionChangeInfo | null = null;
        collection.collectionChanged.on('collectionChange', (info: CollectionChangeInfo) => {
            collectionChangeInfo = info;
        });
        collection.removeItem("Item 1");
        expect(collection.numElements).toBe(1);
        expect(collection.getItemAt(0)).toBe("Item 2");
        expect(collectionChangeInfo).toBeTruthy();
        expect(collectionChangeInfo!.action).toBe(CollectionChangeAction.Remove);
        expect(collectionChangeInfo!.oldIndex).toBe(0);
        expect(collectionChangeInfo!.oldItems).toEqual(["Item 1"]);
    });
});

