<template>
  <div id="home">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>Employees</h4>
      </li>
      <div class="empolyee_info">
        <li v-for="employee in employees" :key="employee.id" class="collection-item">
          <div class="chip">{{employee.dept}}</div>
          {{employee.employee_id}}: {{employee.name}}
          <nuxt-link
            class="secondary-content"
            :to="{ name: 'ViewEmployee', params: { employee_id: employee.employee_id }}"
          >
            <font-awesome-icon :icon="['fas', 'eye']" />
          </nuxt-link>
        </li>
      </div>
    </ul>
    <div class="fixed-action-btn">
      <nuxt-link to="/NewEmployee" class="btn-floating btn-large red">
        <font-awesome-icon :icon="['fas', 'plus']" />
      </nuxt-link>
    </div>
  </div>
</template>
<script>
import { fireDb } from "~/plugins/firebase.js";
export default {
  data() {
    employees: null;
  },
  async asyncData({ params }) {
    const teasers = [];
    const ref = fireDb.collection("employees").orderBy("employee_id");
    let snap;
    try {
      snap = await ref.get();
      snap.forEach(doc => {
        teasers.push({
          id: doc.id,
          employee_id: doc.data().employee_id,
          name: doc.data().name,
          dept: doc.data().dept,
          position: doc.data().position
        });
      });
    } catch (e) {
      // TODO: error handling
      console.error(e);
    }
    return {
      teasers,
      employees: teasers
    };
  }
};
</script>
<style scoped>
#home {
  max-width: 600px;
}
li {
  padding: 20px;
  margin: 5px;
  background: rgb(243, 225, 225);
  border: 1px solid #000;
}
.collection-item{
  display: flex;
  justify-content: space-between
}
</style>