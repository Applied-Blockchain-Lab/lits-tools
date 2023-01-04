import { defineStore } from "pinia";
// TODO: Import separate packages for every used lodash function
import isEqual from "lodash.isequal";
import filter from "lodash.filter";

export const ListStore = (storeId, itemsPerPage, isScrollable = false) =>
  defineStore(`${storeId}`, {
    state: () => ({
      allItems: [],
      filteredItems: [],
      selectedItems: [],
      currentPage: 0,
      itemsPerPage: itemsPerPage,
      pageItems: {
        startIndex: 0,
        endIndex: 0,
      },
      isScrollable: isScrollable,
      appliedFilters: [],
    }),
    actions: {
      init(allItems, itemsPerPage) {
        this.setAllItems(allItems);
        this.setCurrentPage(1);

        const _itemsPerPage = this.allItems.length < itemsPerPage ? this.allItems.length : itemsPerPage;

        this.setItemsPerPage(_itemsPerPage);
        this.setPageItems({ startIndex: 0, endIndex: this.pageItems.startIndex + this.itemsPerPage - 1 });
      },
      insertRow(item) {
        this.allItems.push(item);
      },
      setAllItems(allItems) {
        this.allItems = allItems;
      },
      setFilteredItems(filteredItems) {
        this.filteredItems = filteredItems;
      },
      setSelectedItems(selectedItems) {
        this.selectedItems = selectedItems;
      },
      isItemSelected(item) {
        for (let i = 0; i < this.selectedItems.length; i++) {
          if (isEqual(this.selectedItems[i], item)) {
            return true;
          }
        }

        return false;
      },
      setItemsPerPage(itemsPerPage) {
        this.itemsPerPage = Number(itemsPerPage);
      },
      setPageItems(pageItems) {
        this.pageItems = pageItems;
      },
      setCurrentPage(page) {
        this.currentPage = Number(page);
      },
      // addFilter(filter, filterKey, args) {
      //   this.appliedFilters.push({ filter, filterKey, args });
      // },
      addFilter(filter) {
        this.appliedFilters.push({ filter });
      },
      applyFilter(comparator) {
        // console.log("Range:", args);
        // console.log(this.getFilteredItems);
        const filteredItems = filter(this.getFilteredItems, comparator);

        console.log("Filtered items:", filteredItems);
        this.setFilteredItems(filteredItems);
        this.setCurrentPage(1);
        // TODO: Fix this
        const allItemsLength = this.getFilteredItems.length;
        const itemsPerPage = this.getItemsPerPage;
        this.setItemsPerPage(allItemsLength < itemsPerPage ? allItemsLength : itemsPerPage);
        this.setPageItems({ startIndex: 0, endIndex: this.getItemsPerPage - 1 });
        //
        // this.addFilter(filter, filterKey, args);
        this.addFilter(filter);
      },
      // removeFilter(filter) {
      //   this.setFilteredItems([]);
      // },
    },
    getters: {
      getItemsPerPage: (state) => state.itemsPerPage,
      getCurrentPage: (state) => state.currentPage,
      getFilteredItems: (state) => (state.filteredItems.length === 0 ? state.allItems : state.filteredItems),
    },
  })();
