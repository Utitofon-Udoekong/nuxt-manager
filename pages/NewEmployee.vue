<template>
  <div id="new-employee">
    <h3>New Employee</h3>
    <div class="row">
      <form @submit.prevent="saveEmployee" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="employee_id" required />
            <label>Employee ID#</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required />
            <label>Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="dept" required />
            <label>Department</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="position" required />
            <label>Position</label>
          </div>
        </div>
        <button type="submit" class="btn">Submit</button>
        <router-link to="/" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { fireDb } from "~/plugins/firebase.js";
export default {
  name: "new-employee",
  data() {
    return {
      employee_id: null,
      name: null,
      dept: null,
      position: null
    };
  },
  methods: {
    async saveEmployee() {
      const ref = fireDb.collection("employees")
      .add({
        employee_id: this.employee_id,
        name: this.name,
        dept: this.dept,
        position: this.position
      });
      this.$router.push('/')
      let snap;
      try {
        snap = await ref.get(doc.id);
        console.log(`client added: ${snap}`)
      } catch (error) {
       console.error(error) 
      }
    }
  }
};
</script>