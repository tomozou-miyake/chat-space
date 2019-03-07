## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user_id|refference|null: false, foreign_key: true|
|group_id|refference|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
- belongs_to :member

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|refference|null: false, foreign_key: true|
|group_id|refference|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
- has_many :messages

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false ,add_index|
|email|string|add_index,null: false|
|password|string|add_index,null: false|

### Association
- has_many :members
- has_many :messages

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null :false|

### Association
- has_many :members
- has_many :messages
