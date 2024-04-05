<template>
  <div>
    <CreateEditUser
      v-if="userForm"
      :user="user"
      :open="userForm"
      @close="handleCloseForm"
      @save="handleSave"
    />
    <UserView v-if="userView" :open="userView" @close="handleCloseView" />

    <div class="print-hide users-table-header">
      <CustomInput
        @input="handleFilter"
        placeholder="Search by user name"
        outlined
        class="search-input"
      />
      <div class="buttons">
        <CustomButton
          class="new-user-btn"
          @click="handleUserForm(null)"
          type="submit"
          color="primary"
          icon="mdi-plus"
          label="New User"
        />
      </div>
    </div>

    <CustomLoading v-if="loading" />

    <div
      class="users-table"
      v-if="filteredUsers && filteredUsers.length && !loading"
    >
      <v-simple-table class="mb-6">
        <template v-slot:default>
          <thead>
            <tr>
              <th></th>
              <th class="text-left">First Name</th>
              <th class="text-left">Last Name</th>
              <th class="text-left">Title</th>
              <th class="text-left"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredUsers" :key="item.id">
              <td>
                <img
                  style="border-radius: 50%; max-width: 2rem"
                  :src="item.picture"
                  alt=""
                />
              </td>
              <td>{{ item.firstName }}</td>
              <td>{{ item.lastName }}</td>
              <td>{{ item.title }}</td>
              <td class="d-flex justify-end align-center ga-3 print-hide">
                <IconButton
                  @click="handleUserView(item.id)"
                  icon="visibility"
                />
                <IconButton
                  @click="handleUserForm(item.id)"
                  color="primary"
                  icon="edit"
                />
                <IconButton
                  @click="handleDelete(item.id)"
                  color="error"
                  icon="delete"
                />
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
    <div
      class="no-data d-flex justify-center"
      v-if="(!filteredUsers || !filteredUsers.length) && !loading"
    >
      <h2>No users were found</h2>
    </div>
    <v-pagination v-model="page" :length="pages"></v-pagination>

    <CustomSnackbar
      :open="!!toastMessage"
      :text="toastMessage"
      @close="toastMessage = null"
      timeout="3000"
    />
  </div>
</template>

<script>
import CustomSnackbar from "../components/CustomSnackbar";
import CustomLoading from "../components/CustomLoading";
import IconButton from "../components/IconButton.vue";
import CustomButton from "../components/CustomButton.vue";
import CustomInput from "../components/CustomInput.vue";
import CreateEditUser from "../components/user/CreateEditUser.vue";
import UserView from "../components/user/UserView.vue";
import debounce from "../utils/debounce";
import { setWindowName } from "../utils/meta";

export default {
  name: "UsersView",
  components: {
    CustomSnackbar,
    CreateEditUser,
    UserView,
    IconButton,
    CustomInput,
    CustomButton,
    CustomLoading,
  },
  data: () => ({
    filteredUsers: [],
    userForm: false,
    userView: false,
    toastMessage: null,
  }),
  watch: {
    users: function (newVal) {
      this.filteredUsers = newVal;
    },
  },
  computed: {
    users() {
      return this.$store.getters["users"];
    },
    currentUser() {
      return this.$store.getters["currentUser"];
    },
    pages() {
      return this.$store.getters["pages"];
    },
    loading() {
      return this.$store.getters["loading"];
    },
    page: {
      get() {
        return this.$store.getters["page"];
      },
      async set(newVal) {
        await this.$store.dispatch("setPage", newVal);
      },
    },
  },
  methods: {
    async getUsers() {
      await this.$store.dispatch("getUsers");
      this.filteredUsers = this.users;
    },
    async handlePage() {
      await this.$store.dispatch("setPage");
    },
    handleFilter(e) {
      debounce(() => {
        if (!e) {
          this.filteredUsers = this.users;
        } else {
          this.filteredUsers = this.filteredUsers.filter((user) => {
            return user.firstName.toLowerCase().includes(e.toLowerCase());
          });
        }
      }, 500).call();
    },

    handleCloseForm() {
      this.user = {};
      this.userForm = false;
      this.toastMessage = null;
    },

    handleCloseView() {
      this.user = {};
      this.userView = false;
      this.toastMessage = null;
    },

    async handleUserForm(id) {
      this.toastMessage = null;
      if (id) {
        await this.$store.dispatch("getUser", id);
      } else {
        await this.$store.dispatch("clearUser", id);
      }
      this.userForm = true;
    },

    async handleUserView(id) {
      this.toastMessage = null;
      if (id) {
        await this.$store.dispatch("getUser", id);
        this.userView = true;
      }
    },

    async handleSave() {
      try {
        this.currentUser.id
          ? await this.$store.dispatch("editUser", this.currentUser)
          : await this.$store.dispatch("createUser", this.currentUser);

        this.toastMessage = "User saved!";
        await this.getUsers();
      } catch (err) {
        this.toastMessage = "Something went wrong, try again later";
      }
      this.userForm = false;
    },

    async handleDelete(id) {
      if (id) {
        await this.$store.dispatch("removeUser", id);
        this.toastMessage = "User deleted";
      }
      await this.getUsers();
    },
  },
  async mounted() {
    await this.getUsers();
    setWindowName("QuiteJá | Users");
  },
};
</script>

<style lang="scss" scoped>
.users-table-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 1rem 0;
  gap: 1rem;
  .search-input {
    max-width: 400px;
  }
  .buttons {
    display: flex;
  }

  @media only screen and (max-width: 600px) {
    flex-direction: column !important;
    align-items: stretch;
    justify-content: start;
    gap: 0;
    .buttons {
      gap: 0.5rem;
      button {
        flex: 1;
      }
    }
    .search-input {
      max-width: 100%;
      width: 100%;
    }
  }
}
</style>
