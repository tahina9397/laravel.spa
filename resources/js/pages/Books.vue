<template>
    <div>
        <h4 class="text-center">All Books</h4>
        <br />
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="book in books" :key="book.id">
                    <td>{{ book.id }}</td>
                    <td>{{ book.name }}</td>
                    <td>{{ book.author }}</td>
                    <td>{{ book.created_at }}</td>
                    <td>{{ book.updated_at }}</td>
                    <td>
                        <div class="btn-group" role="group">
                            <button
                                class="btn btn-danger"
                                @click="deleteBook(book.id)"
                            >
                                Delete
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

export default {
    data() {
        return {
        };
    },
    props:{
        books : Array
    }
};
</script>
