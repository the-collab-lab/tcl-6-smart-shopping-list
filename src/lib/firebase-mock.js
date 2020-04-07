export default class FirestoreMock {
  constructor() {
    // mocked methods that return the class
    this.mockCollection = jest.fn(() => this);
    this.mockWhere = jest.fn(() => this);
    this.mockOrderBy = jest.fn(() => this);
    this.mockDoc = jest.fn(() => this);

    // methods that return promises
    this.mockAdd = jest.fn(() => Promise.resolve(this._mockAddReturn));
    this.mockGet = jest.fn(() => Promise.resolve(this._mockGetReturn));
    this.mockSet = jest.fn(() => Promise.resolve(this._mockSetReturn));

    // methods that accepts callbacks
    this.mockOnSnaptshot = jest.fn((success, error) =>
      success(this._mockOnSnaptshotSuccess),
    );

    // return values
    this._mockDocReturn = null;
    this._mockAddReturn = null;
    this._mockGetReturn = null;
    this._mockSetReturn = null;
    this._mockOnSnaptshotSuccess = null;
  }

  collection(c) {
    return this.mockCollection(c);
  }

  where(...args) {
    return this.mockWhere(...args);
  }

  orderBy(...args) {
    return this.mockOrderBy(...args);
  }

  add(a) {
    return this.mockAdd(a);
  }

  doc(a) {
    return this.mockDoc(a);
  }

  get() {
    return this.mockGet();
  }

  set(a) {
    return this.mockSet(a);
  }

  onSnapshot(success, error) {
    return this.mockOnSnaptshot(success, error);
  }

  set mockAddReturn(val) {
    this._mockAddReturn = val;
  }

  set mockGetReturn(val) {
    this._mockGetReturn = val;
  }

  set mockSetReturn(val) {
    this._mockSetReturn = val;
  }

  set mockOnSnaptshotSuccess(val) {
    this._mockOnSnaptshotSuccess = val;
  }

  reset() {
    // reset all the mocked returns
    this._mockAddReturn = null;
    this._mockGetReturn = null;
    this._mockSetReturn = null;
    this._mockOnSnaptshotSuccess = null;

    // reset all the mocked functions
    this.mockCollection.mockClear();
    this.mockWhere.mockClear();
    this.mockOrderBy.mockClear();
    this.mockAdd.mockClear();
    this.mockDoc.mockClear();
    this.mockGet.mockClear();
    this.mockSet.mockClear();
  }
}
