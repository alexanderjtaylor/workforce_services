# Generated by Django 4.1.4 on 2023-02-02 22:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employees', '0004_remove_employee_address_remove_employee_dob_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='OTPayRate',
            field=models.DecimalField(decimal_places=2, default=15.0, max_digits=8),
        ),
        migrations.AddField(
            model_name='employee',
            name='payRate',
            field=models.DecimalField(decimal_places=2, default=15.0, max_digits=8),
        ),
    ]
