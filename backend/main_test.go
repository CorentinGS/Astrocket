package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_computeETag(t *testing.T) {
	type args struct {
		usersSlice []map[string]interface{}
	}
	tests := []struct {
		name string
		args args
		want string
	}{
		{
			name: "test1",
			args: args{
				usersSlice: []map[string]interface{}{
					{
						"id":   "1",
						"name": "user1",
					},
					{
						"id":   "2",
						"name": "user2",
					},
				},
			},
			want: "57bc28f1fde0c1c700ac12f951c2c60a",
		},
		{
			name: "test2",
			args: args{
				usersSlice: []map[string]interface{}{
					{
						"id":   "2",
						"name": "user2",
					},
					{
						"id":   "1",
						"name": "user1",
					},
				},
			},
			want: "57bc28f1fde0c1c700ac12f951c2c60a",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := computeETag(tt.args.usersSlice); got != tt.want {
				t.Errorf("computeETag() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestSortUsersSortsUsersById(t *testing.T) {
	usersSlice := []map[string]interface{}{
		{"id": "2", "name": "Jane"},
		{"id": "1", "name": "John"},
	}
	sortUsers(usersSlice)
	assert.Equal(t, "1", usersSlice[0]["id"])
	assert.Equal(t, "2", usersSlice[1]["id"])
}
