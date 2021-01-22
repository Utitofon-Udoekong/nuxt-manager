<template>
  <div id="new-employee">
    <h3>Edit Employee</h3>
    <div class="row">
      <form @submit.prevent="updateEmployee" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <label >id</label>
            <input type="text" v-model="employees.employee_id" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <label for="">name</label>
            <input type="text" v-model="employees.name" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <label for="">dept</label>
            <input type="text" v-model="employees.dept" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <label for="">position</label>
            <input type="text" v-model="employees.position" required />
          </div>
        </div>
        <button type="submit" class="btn">Submit</button>
        <nuxt-link to="/" class="btn grey">Cancel</nuxt-link>
      </form>
    </div>
  </div>
</template>

<script>
import { fireDb } from "~/plugins/firebase.js";
export default {
  name: "editEmployee",
  data() {
    return {
      employees: null
    };
  },
  async asyncData ({params}) {
    const ref = fireDb
      .collection("employees")
    let snap;
    let teasers = []
    try {
      snap = await ref.where("employee_id", "==", params.employee_id).get()
      snap.docs.map(doc => {
        teasers = doc.data()
      })
    } catch (error) {
      console.error(error);
    }
    return{
      employees: teasers
    }
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    async fetchData() {
      const ref = fireDb.collection("employees")
      let snap;
      let teasers = []
      try {
        snap = await ref.where("employee_id","==",this.$route.params.employee_id);
        snap.docs.map(doc => {
          teasers = doc.data()
      })
      } catch (error) {
        console.error(error)
      }
      return{
        employees: teasers
      }
    },
    async updateEmployee() {
      const ref = fireDb
        .collection("employees")
      let snap;
      try {
        snap = await ref.where("employee_id", "==", this.$route.params.employee_id).get();
        snap.docs.map(doc => {
          doc.ref.update({
            employee_id: this.employees.employee_id,
            name: this.employees.name,
            dept: this.employees.dept,
            position: this.employees.position
          });
          this.$router.push({ name: 'ViewEmployee', params: { employee_id: this.employees.employee_id }})
        });
        console.log(employees.employee_id)
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>