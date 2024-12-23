"""create portfolio table

Revision ID: 0eb9516d739c
Revises: 
Create Date: 2024-11-29 15:23:23.478423

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0eb9516d739c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('emails',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('recipient', sa.String(), nullable=False),
    sa.Column('sender_name', sa.String(), nullable=False),
    sa.Column('sender_company', sa.String(), nullable=False),
    sa.Column('subject', sa.String(), nullable=False),
    sa.Column('message', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('institutes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('logo', sa.String(), nullable=False),
    sa.Column('location', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('profile',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=False),
    sa.Column('last_name', sa.String(), nullable=False),
    sa.Column('image', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('profile_bio', sa.String(), nullable=False),
    sa.Column('employed', sa.Boolean(), nullable=False),
    sa.Column('open_to_work', sa.Boolean(), nullable=False),
    sa.Column('date_of_birth', sa.Date(), nullable=False),
    sa.Column('home_country', sa.String(), nullable=False),
    sa.Column('home_town', sa.String(), nullable=False),
    sa.Column('current_country', sa.String(), nullable=False),
    sa.Column('current_town', sa.String(), nullable=False),
    sa.Column('_password_hash', sa.String(), nullable=False),
    sa.Column('git_hub_link', sa.String(), server_default='', nullable=False),
    sa.Column('linkdn_link', sa.String(), server_default='', nullable=False),
    sa.Column('insta_link', sa.String(), server_default='', nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('projects',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('image', sa.String(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('git_hub_link', sa.String(), nullable=True),
    sa.Column('blog_link', sa.String(), nullable=True),
    sa.Column('start_date', sa.Date(), nullable=False),
    sa.Column('end_date', sa.Date(), nullable=False),
    sa.Column('institute_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['institute_id'], ['institutes.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('languages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('logo', sa.String(), nullable=True),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('experience', sa.String(), nullable=False),
    sa.Column('project_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['project_id'], ['projects.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('projectPoints',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('point', sa.String(), nullable=False),
    sa.Column('project_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['project_id'], ['projects.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('project_languages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('language_id', sa.Integer(), nullable=False),
    sa.Column('project_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['language_id'], ['languages.id'], ),
    sa.ForeignKeyConstraint(['project_id'], ['projects.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('project_languages')
    op.drop_table('projectPoints')
    op.drop_table('languages')
    op.drop_table('projects')
    op.drop_table('profile')
    op.drop_table('institutes')
    op.drop_table('emails')
    # ### end Alembic commands ###
