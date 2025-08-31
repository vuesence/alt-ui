<script setup lang="ts">
import { ref } from "vue";
import {
  AltCheckbox,
  AltInput,
  AltMenu,
  AltRadioGroup,
  AltSegmentGroup,
  AltSelect,
  AltSpinner,
  AltSwitch,
  AltTable,
  type TableColumnDefinition,
  type TableRowData,
} from "../";

// Input demo data
const inputValue = ref("");
const inputWithLabel = ref("");
const inputWithError = ref("");
const inputWithSuccess = ref("");

// Select demo data
const selectValue = ref("");
const selectOptions = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

// Checkbox demo data
const checkboxValue = ref(false);
const indeterminateCheckbox = ref(false);

// Radio group demo data
const radioValue = ref("1");
const radioItems = [
  { value: "1", label: "Radio 1" },
  { value: "2", label: "Radio 2" },
  { value: "3", label: "Radio 3" },
];

// Switch demo data
const switchValue = ref(false);

// Table demo data
const tableColumns: TableColumnDefinition[] = [
  {
    key: "name",
    label: "Name",
    sortable: true,
  },
  {
    key: "email",
    label: "Email",
    sortable: true,
  },
  {
    key: "role",
    label: "Role",
    sortable: true,
  },
];
// const tableItems: TableRow[] = [
//   { id: "1", cells: { id: "1", name: "John Doe", email: "john@example.com" } },
//   {
//     id: "2",
//     cells: { id: "2", name: "Jane Smith", email: "jane@example.com" },
//   },
//   {
//     id: "3",
//     cells: { id: "3", name: "Bob Johnson", email: "bob@example.com" },
//   },
// ];

// Segment group demo data
const segmentValue = ref("1");
const segmentItems = ["Segment 1", "Segment 2", "Segment 3"];

// Menu demo data
const menuItems = [
  { key: "1", label: "Menu Item 1" },
  { key: "2", label: "Menu Item 2" },
  { key: "3", label: "Menu Item 3" },
];
</script>

<template>
  <div class="ui-demo">
    <h1>UI Components Demo</h1>

    <section>
      <h2>Input</h2>
      <div class="component-group">
        <AltInput v-model="inputValue" placeholder="Basic input" />
        <AltInput
          v-model="inputWithLabel"
          label="Input with label"
          placeholder="Type something..."
        />
        <AltInput
          v-model="inputWithError"
          label="Input with error"
          placeholder="Error state"
          state="error"
        />
        <AltInput
          v-model="inputWithSuccess"
          label="Input with success"
          placeholder="Success state"
          state="success"
        />
        <AltInput placeholder="Disabled input" disabled />
      </div>
    </section>

    <section>
      <h2>Select</h2>
      <div class="component-group">
        <AltSelect
          v-model="selectValue"
          :options="selectOptions"
          placeholder="Select an option"
        />
        <AltSelect
          :options="selectOptions"
          placeholder="Disabled select"
          disabled
        />
      </div>
    </section>

    <section>
      <h2>Checkbox</h2>
      <div class="component-group">
        <AltCheckbox v-model="checkboxValue" label="Basic checkbox" />
        <AltCheckbox
          v-model="indeterminateCheckbox"
          label="Indeterminate checkbox"
          :indeterminate="true"
        />
        <AltCheckbox label="Disabled checkbox" disabled />
      </div>
    </section>

    <section>
      <h2>Radio Group</h2>
      <div class="component-group">
        <AltRadioGroup
          v-model="radioValue"
          :items="radioItems"
          name="demo-radio"
        />
        <AltRadioGroup :items="radioItems" name="disabled-radio" disabled />
      </div>
    </section>

    <section>
      <h2>Switch</h2>
      <div class="component-group">
        <AltSwitch v-model="switchValue" label="Basic switch" />
        <AltSwitch label="Disabled switch" disabled />
      </div>
    </section>

    <!-- <section>
      <h2>Table</h2>
      <div class="component-group">
        <AltTable :columns="tableColumns" :data="tableItems" />
      </div>
    </section> -->

    <section>
      <h2>Segment Group</h2>
      <div class="component-group">
        <AltSegmentGroup v-model="segmentValue" :items="segmentItems" />
      </div>
    </section>

    <section>
      <h2>Menu</h2>
      <div class="component-group">
        <AltMenu :items="menuItems" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.ui-demo {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: var(--alt-c-text-1);
}

h2 {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: var(--alt-c-text-1);
}

section {
  margin-bottom: 3rem;
  padding: 2rem;
  background-color: var(--alt-c-surface-1);
  border-radius: 0.5rem;
  border: 1px solid var(--alt-c-border);
}

.component-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 768px) {
  .component-group {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}
</style>
