"""empty message

Revision ID: 852b901f9f7c
Revises: 
Create Date: 2024-09-04 17:05:51.005396

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '852b901f9f7c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=80), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password_hash', sa.String(length=250), nullable=False),
    sa.Column('is_plumber', sa.Boolean(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('plumber_details',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('id_number', sa.String(length=9), nullable=False),
    sa.Column('years_of_experience', sa.Integer(), nullable=False),
    sa.Column('services_offered', sa.String(length=250), nullable=False),
    sa.Column('rates', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('profiles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=50), nullable=False),
    sa.Column('last_name', sa.String(length=50), nullable=False),
    sa.Column('phone_number', sa.String(length=15), nullable=False),
    sa.Column('location', sa.String(length=100), nullable=False),
    sa.Column('image', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('profiles')
    op.drop_table('plumber_details')
    op.drop_table('users')
    # ### end Alembic commands ###
